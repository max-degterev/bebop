import NextDocument from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => (
        originalRenderPage({
          enhanceApp: (App) => (props) => (
            styledComponentSheet.collectStyles(<App {...props} />)
          ),
        })
      );

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentSheet.seal();
    }
  }
}

export default Document;
