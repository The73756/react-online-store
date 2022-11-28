import ContentLoader from 'react-content-loader';

const DeviceLoader = (props) => (
  <ContentLoader
    speed={2}
    width={277.5}
    height={423}
    viewBox="0 0 277.5 423"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="277.5" height="423" />
  </ContentLoader>
);

export default DeviceLoader;
