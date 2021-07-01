app.get('*', (req, res) => {
  const context = { url: req.url };
  renderer.renderToString(context, (error, html) => {
    if (error) return res.send(error.stack);
    const {
      title,
      htmlAttrs,
      headAttrs,
      bodyAttrs,
      link,
      style,
      script,
      noscript,
      meta
    } = context.meta.inject();
    return res.send(`
      <!doctype html>
      <html ${htmlAttrs.text(true)}>
        <head ${headAttrs.text()}>
          ${meta.text()}
          ${title.text()}
          ${link.text()}
          ${style.text()}
          ${script.text()}
          ${noscript.text()}
        </head>
        <body ${bodyAttrs.text()}>
          <!-- prepended metaInfo properties -->
          ${style.text({ pbody: true })}
          ${script.text({ pbody: true })}
          ${noscript.text({ pbody: true })}

          <!-- app -->
          ${html}

          <!-- webpack assets -->
          <script src="/assets/vendor.bundle.js"></script>
          <script src="/assets/client.bundle.js"></script>

          <!-- appended metaInfo properties -->
          ${style.text({ body: true })}
          ${script.text({ body: true })}
          ${noscript.text({ body: true })}
        </body>
      </html>
    `);
  });
});
