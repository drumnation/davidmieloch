import type { ContentOpsSnapshot } from '../../../content-ops/types';

import styles from './ContentOpsConsole.module.css';

type ContentOpsConsoleProps = {
  snapshot: ContentOpsSnapshot;
  mode?: 'full' | 'overview' | 'scheduling' | 'readiness' | 'agent' | 'receipts';
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <article className={styles.statCard}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function EmptyState({ children }: { children: string }) {
  return <p className={styles.emptyState}>{children}</p>;
}

export function ContentOpsConsole({
  snapshot,
  mode = 'full',
}: ContentOpsConsoleProps) {
  const showOverview = mode === 'full' || mode === 'overview';
  const showScheduling = mode === 'full' || mode === 'scheduling';
  const showReadiness = mode === 'full' || mode === 'readiness';
  const showAgent = mode === 'full' || mode === 'agent';
  const showReceipts = mode === 'full' || mode === 'receipts';

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Content Ops Console</p>
          <h1>Website publishing without branch archaeology.</h1>
          <p>
            Internal control room for canonical articles, schedules, readiness,
            approvals, receipts, and safe agent actions.
          </p>
        </div>
        <aside className={styles.guardrail}>
          <strong>Safe boundary</strong>
          <span>No public publishing.</span>
          <span>No deploys.</span>
          <span>No paid generation.</span>
        </aside>
      </section>

      {showOverview ? (
        <section className={styles.panel} aria-labelledby="content-ops-overview">
          <h2 id="content-ops-overview">Overview</h2>
          <div className={styles.statsGrid}>
            <StatCard label="Published" value={snapshot.counts.publishedArticles} />
            <StatCard label="Drafts" value={snapshot.counts.websiteDrafts} />
            <StatCard label="Needs schedule" value={snapshot.counts.needsScheduling} />
            <StatCard label="Blockers" value={snapshot.counts.blockers} />
          </div>
          {snapshot.latestLiveArticle ? (
            <p className={styles.liveLine}>
              Latest live: <strong>{snapshot.latestLiveArticle.title}</strong>
            </p>
          ) : (
            <p className={styles.liveLine}>No live article detected.</p>
          )}
        </section>
      ) : null}

      {showScheduling ? (
        <section
          className={styles.panel}
          aria-labelledby="content-ops-scheduling"
        >
          <h2 id="content-ops-scheduling">Needs Scheduling</h2>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Website</th>
                  <th>Readiness</th>
                  <th>Approval</th>
                  <th>Next action</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.inventory.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <strong>{item.title}</strong>
                      <span>{item.slug}</span>
                    </td>
                    <td>{item.websiteState}</td>
                    <td>{item.readinessState}</td>
                    <td>{item.approvalState}</td>
                    <td>{item.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {showReadiness ? (
        <section
          className={styles.panel}
          aria-labelledby="content-ops-readiness"
        >
          <h2 id="content-ops-readiness">Readiness And Blockers</h2>
          {snapshot.readiness.length > 0 ? (
            <div className={styles.cardGrid}>
              {snapshot.readiness.map((item) => (
                <article className={styles.statusCard} key={item.slug}>
                  <span className={styles.status}>{item.status}</span>
                  <h3>{item.title}</h3>
                  {[...item.blockers, ...item.warnings].map((message) => (
                    <p key={message}>{message}</p>
                  ))}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState>No readiness issues found.</EmptyState>
          )}
        </section>
      ) : null}

      {showAgent ? (
        <section className={styles.panel} aria-labelledby="content-ops-agent">
          <h2 id="content-ops-agent">Agent Actions</h2>
          {snapshot.nextActions.length > 0 ? (
            <div className={styles.cardGrid}>
              {snapshot.nextActions.map((action) => (
                <article className={styles.statusCard} key={action.id}>
                  <span className={styles.status}>
                    {action.safe ? 'safe' : 'blocked'}
                  </span>
                  <h3>{action.label}</h3>
                  <p>{action.reason}</p>
                  {action.command ? <code>{action.command}</code> : null}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState>No safe agent action is currently recommended.</EmptyState>
          )}
        </section>
      ) : null}

      {showReceipts ? (
        <section className={styles.panel} aria-labelledby="content-ops-receipts">
          <h2 id="content-ops-receipts">Receipts</h2>
          {snapshot.receipts.length > 0 ? (
            <div className={styles.cardGrid}>
              {snapshot.receipts.map((receipt) => (
                <article className={styles.statusCard} key={receipt.path}>
                  <span className={styles.status}>{receipt.status}</span>
                  <h3>{receipt.command ?? 'receipt'}</h3>
                  <p>{receipt.path}</p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState>No release receipts found.</EmptyState>
          )}
        </section>
      ) : null}
    </main>
  );
}
