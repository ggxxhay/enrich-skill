import Container from 'react-bootstrap/Container';

import PersonsInfo from './components/PersonsInfo'

const personsData = [
  { id: 1, name: "Thang", age: 18, address: "Hanoi" },
  { id: 2, name: "Thang 2", age: 22, address: "Hanoi 2" },
  { id: 3, name: "Thang 3", age: 21, address: "Hanoi 3" },
]

function App() {
  return (
    <Container>
      <PersonsInfo data={personsData} />
    </Container>
  );
}

export default App;
