export function PrivacyPage() {
  return (
    <main className="page legal-page">
      <article className="legal-card">
        <p className="app-header__eyebrow">Calendar Management</p>
        <h1>Privacy Policy</h1>
        <p className="legal-meta">Effective date: 28 August 2026</p>

        <section>
          <h2>Local-first data storage</h2>
          <p>
            Calendar Management stores events, deadlines, and notes in your browser's
            <code> localStorage</code> under <code>lockscreen-calendar:data:v1</code>. The data remains on the browser
            and device used to create it.
          </p>
        </section>

        <section>
          <h2>What we do not collect</h2>
          <ul>
            <li>We do not create application accounts or ask you to sign in.</li>
            <li>We do not read Shopify merchant resources.</li>
            <li>We do not send events, deadlines, notes, or completion states to a backend or third-party service.</li>
            <li>We do not install cookies or analytics trackers.</li>
            <li>We do not integrate with an external calendar service.</li>
          </ul>
        </section>

        <section>
          <h2>Data control and deletion</h2>
          <p>
            You can create, edit, complete, delete, pin, and unpin your own records. Deleting a record removes it from
            visible data and from <code>localStorage</code>. To permanently remove all workspace data, delete the
            records in the app or clear this website's browser storage.
          </p>
          <p>
            Because the app does not transmit or retain data remotely, clearing browser storage is permanent. There is
            no server copy, trash, undo, backup, import, or export feature.
          </p>
        </section>

        <section>
          <h2>Security</h2>
          <p>
            The app is frontend-only and local-first. It does not request remote-service credentials, store tokens, or
            send your business data across a network. User-entered text is rendered through React's escaping.
          </p>
        </section>

        <section>
          <h2>Scope and changes</h2>
          <p>
            This policy applies specifically to Calendar Management. If a future version adds remote processing, the
            privacy policy and application listing must be updated before release.
          </p>
        </section>
      </article>
    </main>
  )
}
