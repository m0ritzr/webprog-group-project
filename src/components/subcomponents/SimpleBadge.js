import { Badge } from "react-bootstrap";
import {
  FaVenusMars,
  FaPaw,
  FaBirthdayCake,
  FaTag,
  FaMapMarkerAlt,
  FaRuler,
} from "react-icons/fa";

function iconSelector(icon) {
  const STYLE = {color: "white", marginRight: "5px"}
  const CN = "mr-1"
  switch (icon) {
    case "size":
      return (<FaRuler style={STYLE} className={CN}/>)
    case "species":
      return(<FaPaw style={STYLE} className={CN}/>)
    case "age":
      return(<FaBirthdayCake style={STYLE} className={CN}/>)
    case "address":
      return(<FaMapMarkerAlt style={STYLE} className={CN}/>)
    case "gender":
      return(<FaVenusMars style={STYLE} className={CN}/>)
    case "tags":
      return(<FaTag style={STYLE} className={CN}/>)
  }
}

function SimpleBadge({property, icon}) {
    return(
        <Badge variant="dark">
        {iconSelector(icon)}
        {property}
      </Badge>
    )
}


export default SimpleBadge;