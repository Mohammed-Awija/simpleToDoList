import Tasks from "./Tasks";
import "./styles.css";
import { Container } from "@mui/system";

export default function App() {
  return (
    <div className="App">
      <Container sx={{ height: "100vh"}}>
      <Tasks />
      </Container>
    </div>
  );
}
