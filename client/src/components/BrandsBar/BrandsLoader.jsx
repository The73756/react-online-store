import ContentLoader from 'react-content-loader';

const BrandsLoader = (props) => (
  <ContentLoader
    speed={2}
    width={56}
    height={37}
    viewBox="0 0 56 37"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="5" ry="5" width="56" height="37" />
  </ContentLoader>
);

export default BrandsLoader;
