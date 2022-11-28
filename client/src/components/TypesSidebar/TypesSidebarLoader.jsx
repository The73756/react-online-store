import ContentLoader from 'react-content-loader';

const TypesSidebarLoader = (props) => (
  <ContentLoader
    speed={2}
    width={200}
    height={37}
    viewBox="0 0 200 37"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="5" ry="5" width="200" height="37" />
  </ContentLoader>
);

export default TypesSidebarLoader;
