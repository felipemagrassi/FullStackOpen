export default function Filter( {name, setName }) {
  return (
  <div>
    find country: <input value={name} onChange={(e) => setName(e.target.value)}/>
  </div>
)}