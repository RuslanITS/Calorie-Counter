import { Container } from "react-bootstrap";
import { Shop } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container className="text-center">
        <p className="mb-1">
          <Shop className="me-2" />
          Calorie Counter
        </p>

        <small className="text-secondary">
          © 2026 All rights reserved
        </small>
      </Container>
    </footer>
  );
};

export default Footer;