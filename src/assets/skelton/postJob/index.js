import ContentLoader, {Facebook, Circle, Rect, BulletList} from 'react-content-loader/native';

export const JobListCard = () => (
  <ContentLoader height={140} speed={1} backgroundColor={'#333'} foregroundColor={'#999'} viewBox="0 0 300 70">
    {/* Only SVG shapes */}
    <Rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <Rect x="80" y="17" rx="4" ry="4" width="220" height="13" />
    <Rect x="80" y="40" rx="3" ry="3" width="150" height="10" />
  </ContentLoader>
);
