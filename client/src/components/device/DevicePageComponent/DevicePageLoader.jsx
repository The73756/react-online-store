import ContentLoader from 'react-content-loader';

const DevicePageLoader = (props) => (
  <ContentLoader
    speed={2}
    width={1200}
    height={500}
    viewBox="0 0 1200 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ marginTop: 20 }}
    {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="300" height="300" />
    <rect x="349" y="0" rx="5" ry="5" width="600" height="30" />
    <rect x="1000" y="0" rx="10" ry="10" width="200" height="300" />
    <rect x="375" y="40" rx="5" ry="5" width="550" height="20" />
    <rect x="375" y="70" rx="5" ry="5" width="550" height="40" />
    <rect x="375" y="120" rx="5" ry="5" width="550" height="180" />
    <rect x="0" y="320" rx="5" ry="5" width="300" height="30" />
    <rect x="0" y="365" rx="5" ry="5" width="250" height="20" />
    <rect x="0" y="395" rx="5" ry="5" width="250" height="20" />
    <rect x="0" y="425" rx="5" ry="5" width="250" height="20" />
  </ContentLoader>
);

export default DevicePageLoader;
