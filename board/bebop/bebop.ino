// Setting both forward and backward direction to 0 or 1 simultaneously stops the motor
// Setting power to 0 also stops the motor

// Set direction (digital) and speed (analog) to control motors
// Digital value: 0-255
// Per wheel control is currently not possible

#include <Arduino.h>
#include <Servo.h>
#include <ArduinoJson.h>

#define BAUD_RATE 115200

#define CAMERA_SERVO 3

#define LEFT_MOTORS_SPEED 5
#define RIGHT_MOTORS_SPEED 6

#define LEFT_MOTORS_FORWARD 7
#define RIGHT_MOTORS_FORWARD 11

#define LEFT_MOTORS_BACKWARD 8
#define RIGHT_MOTORS_BACKWARD 9

#define MIN_CAMERA_ANGLE 500
#define MAX_CAMERA_ANGLE 2500

#define MOTORS_TYPE_LEFT 0
#define MOTORS_TYPE_RIGHT 1

#define CAR_COMMAND_TIMEOUT 100 // values above 16 are ok, dropping 3 frames at 60 fps is 50

Servo viewport;

unsigned long timestamp;
bool isPristine = true;

// void move(int speed) {
//   digitalWrite(LEFT_MOTORS_FORWARD, HIGH);
//   digitalWrite(RIGHT_MOTORS_FORWARD, HIGH);
//   digitalWrite(LEFT_MOTORS_BACKWARD, LOW);
//   digitalWrite(RIGHT_MOTORS_BACKWARD, LOW);

//   analogWrite(LEFT_MOTORS_SPEED, speed);
//   analogWrite(RIGHT_MOTORS_SPEED, speed);
// }

void setMotors(int type, int value) {
  int speed = constrain(abs(value), 0, 255);
  int forwards = type == MOTORS_TYPE_LEFT ? LEFT_MOTORS_FORWARD : RIGHT_MOTORS_FORWARD;
  int backwards = type == MOTORS_TYPE_LEFT ? LEFT_MOTORS_BACKWARD : RIGHT_MOTORS_BACKWARD;
  int speedController = type == MOTORS_TYPE_LEFT ? LEFT_MOTORS_SPEED : RIGHT_MOTORS_SPEED;

  if (value == 0) {
    digitalWrite(forwards, LOW);
    digitalWrite(backwards, LOW);
  } else if (value > 0) {
    digitalWrite(forwards, HIGH);
    digitalWrite(backwards, LOW);
  } else {
    digitalWrite(forwards, LOW);
    digitalWrite(backwards, HIGH);
  }

  analogWrite(speedController, speed);
}

void setViewport(int value) {
  int angle = constrain(value, 0, 180);
  viewport.write(angle);
}

void resetCar() {
  if (isPristine) return; // nothing to reset

  digitalWrite(LEFT_MOTORS_FORWARD, LOW);
  digitalWrite(RIGHT_MOTORS_FORWARD, LOW);
  digitalWrite(LEFT_MOTORS_BACKWARD, LOW);
  digitalWrite(RIGHT_MOTORS_BACKWARD, LOW);

  digitalWrite(LEFT_MOTORS_SPEED, LOW);
  digitalWrite(RIGHT_MOTORS_SPEED, LOW);

  viewport.write(90);
  isPristine = true;
}

void setup() {
  pinMode(LEFT_MOTORS_FORWARD, OUTPUT);
  pinMode(RIGHT_MOTORS_FORWARD, OUTPUT);
  pinMode(LEFT_MOTORS_BACKWARD, OUTPUT);
  pinMode(RIGHT_MOTORS_BACKWARD, OUTPUT);
  pinMode(LEFT_MOTORS_SPEED, OUTPUT);
  pinMode(RIGHT_MOTORS_SPEED, OUTPUT);

  viewport.attach(CAMERA_SERVO, MIN_CAMERA_ANGLE, MAX_CAMERA_ANGLE);
  viewport.write(90); // move servos to center position -> 90°

  Serial.begin(BAUD_RATE);
  while (!Serial) continue;
}

void loop() {
  if (millis() - timestamp > CAR_COMMAND_TIMEOUT) resetCar();

  // Loop until there is data waiting to be read
  if (!Serial.available()) return;

  // Magically calculated by https://arduinojson.org/v6/assistant/
  StaticJsonDocument<48> doc;
  auto error = deserializeJson(doc, Serial);

  // Error reading JSON, likely command rate is too high, skip this frame
  if (error) {
    // Serial.print(F("Error: "));
    // Serial.println(error.c_str());
    return;
  }

  int leftMotor = doc["l"]; // -255=>255
  int rightMotor = doc["r"]; // -255=>255
  int cameraAngle = doc["c"]; // 0=>180

  setViewport(cameraAngle);
  setMotors(MOTORS_TYPE_LEFT, leftMotor);
  setMotors(MOTORS_TYPE_RIGHT, rightMotor);

  isPristine = false;
  timestamp = millis();
}
