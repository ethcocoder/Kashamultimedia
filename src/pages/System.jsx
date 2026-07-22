import { useLanguage } from '../contexts/LanguageContext';

export default function System() {
  const { t } = useLanguage();

  const capabilities = [
    { title: t('capability1'), desc: t('capability1Desc'), icon: '📺' },
    { title: t('capability2'), desc: t('capability2Desc'), icon: '🎬' },
    { title: t('capability3'), desc: t('capability3Desc'), icon: '✅' },
    { title: t('capability4'), desc: t('capability4Desc'), icon: '📡' },
    { title: t('capability5'), desc: t('capability5Desc'), icon: '📊' },
    { title: t('capability6'), desc: t('capability6Desc'), icon: '🌍' },
  ];

  const segments = [
    { num: '1', title: t('segment1'), desc: t('segment1Desc') },
    { num: '2', title: t('segment2'), desc: t('segment2Desc') },
    { num: '3', title: t('segment3'), desc: t('segment3Desc') },
    { num: '4', title: t('segment4'), desc: t('segment4Desc') },
    { num: '5', title: t('segment5'), desc: t('segment5Desc') },
    { num: '6', title: t('segment6'), desc: t('segment6Desc') },
    { num: '7', title: t('segment7'), desc: t('segment7Desc') },
    { num: '8', title: t('segment8'), desc: t('segment8Desc') },
    { num: '9', title: t('segment9'), desc: t('segment9Desc') },
    { num: '10', title: t('segment10'), desc: t('segment10Desc') },
  ];

  const roles = [
    { title: t('roleAdmin'), desc: t('roleAdminDesc'), icon: '👨‍💼' },
    { title: t('roleManager'), desc: t('roleManagerDesc'), icon: '📋' },
    { title: t('roleProducer'), desc: t('roleProducerDesc'), icon: '🎥' },
    { title: t('roleResearcher'), desc: t('roleResearcherDesc'), icon: '🔍' },
    { title: t('roleEditor'), desc: t('roleEditorDesc'), icon: '✏️' },
    { title: t('roleDistribution'), desc: t('roleDistributionDesc'), icon: '📤' },
  ];

  const workflow = [
    { stage: t('stage1'), desc: t('stage1Desc'), color: 'from-blue-500' },
    { stage: t('stage2'), desc: t('stage2Desc'), color: 'from-purple-500' },
    { stage: t('stage3'), desc: t('stage3Desc'), color: 'from-pink-500' },
    { stage: t('stage4'), desc: t('stage4Desc'), color: 'from-orange-500' },
    { stage: t('stage5'), desc: t('stage5Desc'), color: 'from-green-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* System Overview */}
      <section className="section">
        <div className="text-center mb-12">
          <p className="label mb-3">{t('system')}</p>
          <h1 className="heading-lg mb-4">{t('systemTitle')}</h1>
          <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
            {t('systemSubtitle')}
          </p>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="card card-pad group hover:border-[var(--gold)]/50 transition-colors">
              <div className="text-4xl mb-4">{cap.icon}</div>
              <h3 className="heading-sm mb-3 group-hover:text-[var(--gold)] transition-colors">
                {cap.title}
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recurring Segments */}
      <section className="section bg-[var(--black-elevated)]">
        <div className="text-center mb-12">
          <p className="label mb-3">{t('modules')}</p>
          <h2 className="heading-lg mb-4">{t('segmentsTitle')}</h2>
          <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
            {t('segmentsSubtitle')}
          </p>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map((seg, idx) => (
            <div key={idx} className="card card-pad border-l-4 border-l-[var(--gold)] group hover:border-l-[var(--gold)] transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[var(--gold)]/10">
                    <span className="text-[var(--gold)] font-bold">{seg.num}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="heading-sm mb-2 group-hover:text-[var(--gold)] transition-colors">
                    {seg.title}
                  </h3>
                  <p className="text-sm text-[var(--gray-500)]">
                    {seg.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* User Roles */}
      <section className="section">
        <div className="text-center mb-12">
          <p className="label mb-3">{t('system')}</p>
          <h2 className="heading-lg mb-4">{t('rolesTitle')}</h2>
          <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
            {t('rolesSubtitle')}
          </p>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, idx) => (
            <div key={idx} className="card card-pad group hover:border-[var(--gold)]/50 transition-colors">
              <div className="text-4xl mb-4">{role.icon}</div>
              <h3 className="heading-sm mb-3 group-hover:text-[var(--gold)] transition-colors">
                {role.title}
              </h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                {role.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Publishing Workflow */}
      <section className="section bg-[var(--black-elevated)]">
        <div className="text-center mb-12">
          <p className="label mb-3">{t('integrations')}</p>
          <h2 className="heading-lg mb-4">{t('workflowTitle')}</h2>
          <p className="text-[var(--gray-500)] max-w-2xl mx-auto">
            {t('workflowSubtitle')}
          </p>
          <div className="divider mx-auto mt-6" />
        </div>

        <div className="space-y-4">
          {workflow.map((w, idx) => (
            <div key={idx} className="card card-pad">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className={`flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br ${w.color} to-transparent`}>
                    <span className="text-white font-bold text-lg">{idx + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="heading-sm mb-1">{w.stage}</h3>
                  <p className="text-sm text-[var(--gray-500)]">
                    {w.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
