import {useEffect} from "react";


function Wrapunwrapfield({logo, balance, name, enabled}){

    useEffect(()=>{
        // console.log(name, "new balance", balance)
    }, [balance])

    return(
        <div style={{margin:"4px", border:"1px solid green", width:"100%", background:"rgba(32,32,32,1)", borderRadius: "8px", padding:"8px"}}>
            <div style={{display:"flex"}}>
                <img style={{height:"32px",marginRight:"8px"}} src={logo} alt={name}/>
                {/* <div>logo</div> */}
                <div>{name}</div>
                { enabled? <div style={{alignSelf:"end", marginLeft:"auto", flexBasis:"150px",flexGrow:0, flexShrink:0}}><input style={{color:"green",background:"transparent", outline:"none", alignSelf:"end", flexBasis:"150px",flexGrow:0, flexShrink:0,width:"150px", border:"0px", fontSize:"20px", textAlign:"right"}} id={name} placeholder="0.0"/></div> : null }
            </div>
            <div>Balance: {balance}</div>
        </div>
    )
}

export default Wrapunwrapfield
