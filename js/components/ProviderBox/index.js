import {useEffect} from "react";


function ProviderBox({logo, lastBal, balance, name, coin}){

    useEffect(()=>{
        // console.log(name, "new balance", balance)
    }, [balance])

    return(
        <div style={{margin:"2px", border:"1px solid green", width:"100%", background:"rgba(32,32,32,1)", borderRadius: "8px", padding:"2px"}}>
            <div style={{display:"flex"}}>
                <img style={{height:"48px",marginRight:"4px"}} src={logo} alt={name}/>
                {/* <div>logo</div> */}
                <div>{name}</div>
                <div style={{alignSelf:"end", lineHeight:"0.9em", fontSize:"0.8em", fontWeight:"bold", marginLeft:"auto", flexBasis:"250px",flexGrow:0, flexShrink:0}}>
                    <span style={{lineHeight:"0.4em", fontSize:"0.6em"}}>Last Week:<br/></span>{lastBal} {coin}<br/>
                    <span style={{lineHeight:"0.4em", fontSize:"0.6em"}}>This Week:<br/></span>{balance} {coin}<br/>
                </div>
            </div>
        </div>
    )
}

export default ProviderBox
