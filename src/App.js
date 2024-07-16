import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './App.css';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [category, setCategory] = useState('startup');
  const [news, setNews] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    fetch(`https://inshortsapi.vercel.app/news?category=${category}`)
      .then(response => response.json())
      .then(data => setNews(data.data))
      .catch(error => console.error('Error fetching news:', error));
  }, [category]);

  const handleSelect = (eventKey) => {
    setCategory(eventKey.toLowerCase());
  };

  const handleHomeClick = () => {
    setCategory('startup');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <Navbar expand="lg" className={theme === 'light' ? 'navbar-light' : 'navbar-dark'}>
        <Container>
          <Navbar.Brand href="#home" onClick={handleHomeClick}>E-Akhbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" onClick={handleHomeClick}>Home</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown" onSelect={handleSelect}>
                <NavDropdown.Item eventKey="Startup">Startup</NavDropdown.Item>
                <NavDropdown.Item eventKey="Politics">Politics</NavDropdown.Item>
                <NavDropdown.Item eventKey="Sports">Sports</NavDropdown.Item>
                <NavDropdown.Item eventKey="Business">Business</NavDropdown.Item>
                <NavDropdown.Item eventKey="Technology">Technology</NavDropdown.Item>
                <NavDropdown.Item eventKey="Entertainment">Entertainment</NavDropdown.Item>
                <NavDropdown.Item eventKey="Science">Science</NavDropdown.Item>
                <NavDropdown.Item eventKey="Travel">Travel</NavDropdown.Item>
                <NavDropdown.Item eventKey="Crime">Crime</NavDropdown.Item>
                <NavDropdown.Item eventKey="Fashion">Fashion</NavDropdown.Item>
              </NavDropdown>
              <Button variant="link" className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <h2 className="category-title">Category: {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <Row>
          {news.map(article => (
            <Col md={4} key={article.id} className="mb-4">
              <Card className={`news-card ${theme}`}>
                <Card.Img variant="top" src={article.imageUrl} className="card-img-top" />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.content}</Card.Text>
                  <Card.Footer className="text-muted author-date">
                    <div className='author-date'>

                    <small>{article.author} - {new Date(article.date).toLocaleDateString()}</small>
                    </div>
                    <div className="mt-2">
                      <Button variant="primary" onClick={() => window.location.href = article.readMoreUrl}>Read More</Button>
                    </div>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
