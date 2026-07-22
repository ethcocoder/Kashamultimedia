import { useLanguage } from '../contexts/LanguageContext';

export default function Integrations() {
  const { t } = useLanguage();

  const integrations = [
    {
      title: t('youtubeTitle'),
      desc: t('youtubeDesc'),
      icon: '📹',
      features: [
        'OAuth 2.0 Authentication',
        'Automated Video Uploads',
        'Metadata Mapping',
        'Scheduled Publishing',
        'Analytics Sync-Back',
        'Playlist Management',
      ],
    },
    {
      title: t('telegramTitle'),
      desc: t('telegramDesc'),
      icon: '💬',
      features: [
        'Bot API Integration',
        'Text & Media Posts',
        'Scheduled Sends',
        'Channel Pinning',
        'Inline Buttons',
        'Delivery Confirmation',
      ],
    },
    {
      title: t('radioTitle'),
      desc: t('radioDesc'),
      icon: '📻',
      features: [
        'Live Broadcasting',
        'Weekly Schedule',
        'Episode Management',
        'Content Archival',
        'Multi-Language Support',
        'Guest Management',
      ],
    },
  ];

  const architecture = [
    { layer: 'Frontend', desc: 'Web-based admin dashboard for producers/editors/managers', icon: '🖥️' },
    { layer: 'Backend / API', desc: 'REST service exposing content, media, and publish-job endpoints', icon: '⚙️' },
    { layer: 'Database', desc: 'Relational store for structured content metadata', icon: '💾' },
    { layer: 'Media Storage', desc: 'Object storage for audio/video/image files', icon: '📦' },
    { layer: 'Integration Services', desc: 'YouTube Data API v3 and Telegram Bot API clients', icon: '🔗' },
    { layer: 'Job Scheduler', desc: 'Background worker for scheduled publish dispatch and retry', icon: '⏰' },
  ];

  return (
    <div className="min-h-screen">
      {/* Integrations Overview */}
      <section className="section">
        <div className="text-center mb-12">
          <p className="label mb-3">{t('integrations')}</p>
          <h1 className="heading-lg mb-4">{t('integrationsTitle')}</h1>
          <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
            {t('integrationsSubtitle')}
          </p>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {integrations.map((integration, idx) => (
            <div key={idx} className="card card-pad group hover:border-[var(--gold)]/50 transition-colors">
              <div className="text-5xl mb-4">{integration.icon}</div>
              <h3 className="heading-sm mb-3 group-hover:text-[var(--gold)] transition-colors">
                {integration.title}
              </h3>
              <p className="text-sm text-[var(--gray-500)] mb-6 leading-relaxed">
                {integration.desc}
              </p>
              <div className="border-t border-[var(--white-faint)] pt-4">
                <p className="text-xs uppercase tracking-wider text-[var(--gold)] mb-3">Features</p>
                <ul className="space-y-2">
                  {integration.features.map((feature, fidx) => (
                    <li key={fidx} className="text-xs text-[var(--gray-500)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="section bg-[var(--black-elevated)]">
        <div className="text-center mb-12">
          <p className="label mb-3">{t('system')}</p>
          <h2 className="heading-lg mb-4">Technical Architecture</h2>
          <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
            Reference architecture for the Kasha Multimedia CMS platform
          </p>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="space-y-4">
          {architecture.map((arch, idx) => (
            <div key={idx} className="card card-pad border-l-4 border-l-[var(--gold)]">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{arch.icon}</div>
                <div className="flex-1">
                  <h3 className="heading-sm mb-2">{arch.layer}</h3>
                  <p className="text-sm text-[var(--gray-500)]">
                    {arch.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Non-Functional Requirements */}
      <section className="section">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Non-Functional Requirements</h2>
          <div className="divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card card-pad">
            <h3 className="heading-sm mb-3 text-[var(--gold)]">🔒 Security</h3>
            <p className="text-sm text-[var(--gray-500)] leading-relaxed">
              Credentials for YouTube and Telegram integrations stored encrypted, not in application code. Access scoped by role. Publish and edit actions logged for audit.
            </p>
          </div>

          <div className="card card-pad">
            <h3 className="heading-sm mb-3 text-[var(--gold)]">📈 Scalability</h3>
            <p className="text-sm text-[var(--gray-500)] leading-relaxed">
              Media storage sized for growing video/audio archives. Queue-based dispatch to absorb concurrent scheduled publishes.
            </p>
          </div>

          <div className="card card-pad">
            <h3 className="heading-sm mb-3 text-[var(--gold)]">🛡️ Reliability</h3>
            <p className="text-sm text-[var(--gray-500)] leading-relaxed">
              Automatic retry with backoff and alerting on publish failure to either channel. Failed jobs visible for manual retry.
            </p>
          </div>

          <div className="card card-pad">
            <h3 className="heading-sm mb-3 text-[var(--gold)]">✅ Compliance</h3>
            <p className="text-sm text-[var(--gray-500)] leading-relaxed">
              Editorial workflow enforces Ethiopian Broadcasting Authority policies, proclamations, and directives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
