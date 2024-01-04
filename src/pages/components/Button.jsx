
export default function Button(props) {
  const { children, onClick, ...rest } = props

  return (<>
    <button onClick={onClick} {...rest}>{children}</button>
  </>)
}