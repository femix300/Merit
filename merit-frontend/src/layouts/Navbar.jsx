import NavbarComponent from '../components/Navbar';

// This is a proxy component to maintain backward compatibility
// while we transition to using components directly
const Navbar = () => {
  return <NavbarComponent />;
};

export default Navbar; 