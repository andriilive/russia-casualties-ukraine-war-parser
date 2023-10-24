function ResourceItem({name, length}) {
    return `
    <li>
      <a href="/api/${name}">/api/${name}</a>
      <sup>${length ? `${length}x` : 'object'}</sup>
    </li>
  `
}

function ResourceList({db}) {
    return `
    <ul>
        <li>
      <a href="/api/">/api/</a>
      <sup>object</sup>
        </li>
      ${Object.keys(db)
        .map((name) => ResourceItem({
            name, length: Array.isArray(db[name]) && db[name].length,
        }),)
        .join('')}
    </ul>
  `
}

function NoResources() {
    return `<p>No resources found</p>`
}

function ResourcesBlock({db}) {
    return `
    <div>
      <h2>API routes</h2>
      ${Object.keys(db).length ? ResourceList({db}) : NoResources()}
    </div>
  `
}

window
    .fetch('db')
    .then((response) => response.json())
    .then((db) => (document.getElementById('resources').innerHTML = ResourcesBlock({db})),)

function CustomRoutesBlock({customRoutes}) {
    const rules = Object.keys(customRoutes)
    if (rules.length) {
        return `
      <div>
        <h2>Custom Routes</h2>
        <table>
          ${rules
            .map((rule) => `<tr>
              <td><a href="${rule.replace('/*', '')}" />${rule}</a></td>
              <td><code>⇢</code> ${customRoutes[rule]}</td>
            </tr>`,)
            .join('')}
        </table>
      </div>
    `
    }
}

window
    .fetch('__rules')
    .then((response) => response.json())
    .then((customRoutes) => (document.getElementById('custom-routes').innerHTML = CustomRoutesBlock({
        customRoutes,
    })),)
