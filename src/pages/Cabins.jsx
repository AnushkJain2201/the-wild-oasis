// import { useEffect } from "react";
import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
// import { getCabins } from "../services/apiCabins";

function Cabins() {
	const [showForm, setShowForm] = useState(false);
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All cabins</Heading>
				<p>filter / sort</p>
			</Row>

			<Row>
				<CabinTable />
				{showForm && <CreateCabinForm />}
				<Button onClick={() => setShowForm(show => !show)}>Add new cabin</Button>
			</Row>
		</>
	);
}

export default Cabins;
