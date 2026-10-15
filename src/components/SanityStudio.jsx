import { createHashHistory } from 'history';
import { useMemo } from 'react';
import { Studio } from 'sanity';
import { createStudioConfig } from '../../sanity/studioConfig';

export default function SanityStudio({ projectId, dataset }) {
  const config = useMemo(() => createStudioConfig(projectId, dataset), [projectId, dataset]);
  const history = useMemo(() => createHashHistory(), []);

  if (!projectId) {
    return <p>缺少 PUBLIC_SANITY_PROJECT_ID，暂时无法打开内容后台。</p>;
  }

  return (
    <div style={{ height: '100vh', maxHeight: '100dvh', overflow: 'hidden' }}>
      <Studio config={config} unstable_history={history} />
    </div>
  );
}
