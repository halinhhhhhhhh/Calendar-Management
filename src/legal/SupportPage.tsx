
const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL
const supportHours = import.meta.env.VITE_SUPPORT_HOURS ?? 'Monday to Friday, 9:00–17:00 (GMT+7)'

export function SupportPage() {
  return (
    <main className="page legal-page">
      <article className="legal-card">
        <p className="app-header__eyebrow">Calendar Management</p>
        <h1>Support</h1>

        <section>
          <h2>How to get help</h2>
          {supportEmail ? (
            <p>
              Email <a href={`mailto:${supportEmail}`}>{supportEmail}</a> and include a short description, the browser
              you are using, and what you expected to happen.
            </p>
          ) : (
            <p className="legal-callout">
              Support contact information has not been configured. Set <code>VITE_SUPPORT_EMAIL</code> during the
              production build.
            </p>
          )}
        </section>

        <section>
          <h2>Support hours</h2>
          <p>{supportHours}</p>
          <p>We aim to acknowledge support requests within two business days.</p>
        </section>

        <section>
          <h2>Data you should not send</h2>
          <p>
            Do not include confidential business data when contacting support. Because your records stay in browser
            storage, support cannot recover deleted data or transfer it from another device.
          </p>
        </section>

        <section>
          <h2>Before contacting support</h2>
          <ul>
            <li>Reload the page and check whether the issue remains.</li>
            <li>Confirm that this website is allowed to use browser storage.</li>
            <li>Check whether the issue occurs with a newly created record.</li>
          </ul>
        </section>
      </article>
    </main>
  )
}
