const ListItem = props => {
  const {itemDetails} = props
  const {id, imageUrl, name} = itemDetails

  return (
    <li key={id}>
      <div>
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </li>
  )
}
export default ListItem
