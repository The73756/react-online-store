import ContentLoader from 'react-content-loader';

const PaginationLoader = (props) => (
  <ContentLoader
    speed={2}
    width={49.42}
    height={37}
    viewBox="0 0 49.42 37"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="5" ry="5" width="49.42" height="37" />
  </ContentLoader>
);

export default PaginationLoader;
