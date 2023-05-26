import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Stream() {
  return (
    <DropdownButton
      id="dropdown-button-dark-example2"
      variant="dark"
      menuVariant="dark"
      title="Stream"
      className="row pb-1"
    >
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
    </DropdownButton>
  );
}
