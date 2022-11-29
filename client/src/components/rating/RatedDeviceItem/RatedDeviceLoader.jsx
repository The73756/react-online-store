import ContentLoader from 'react-content-loader';

const RatedDeviceLoader = (props) => (
  <ContentLoader
    speed={2}
    width={585}
    height={449}
    viewBox="0 0 585 449"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="585" height="449" />
  </ContentLoader>
);

export default RatedDeviceLoader;
