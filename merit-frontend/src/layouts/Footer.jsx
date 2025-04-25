import FooterComponent from '../components/Footer';

// This is a proxy component to maintain backward compatibility
// while we transition to using components directly
const Footer = () => {
  return <FooterComponent />;
};

export default Footer; 