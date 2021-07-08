import {RequestCard} from './RequestCard'

export const RequestsList = ({requests}) => {
    console.log(requests.length)
    if(typeof requests === Array ){
        return(
            <>
                {requests.map(request => {
                    return(
                        <>
                            <RequestCard key={request.title} info={request} />
                        </>
                    )
                })}
            </>
        )
    }
    else{
        return(
            <>
                <RequestCard key={requests.id} info={requests} />
            </>
        )
        
        
        
    }
}