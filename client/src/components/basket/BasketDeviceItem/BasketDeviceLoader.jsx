import ContentLoader from 'react-content-loader';

const DeviceLoader = (props) => (
  <ContentLoader
    speed={2}
    width={1200}
    height={146}
    viewBox="0 0 1200 146"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ marginTop: 10 }}
    {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="1200" height="146" />
  </ContentLoader>
);

export default DeviceLoader;
