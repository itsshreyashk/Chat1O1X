import React, { useRef } from 'react';

interface msgProps {
    username: string,
    msg: string,
}
interface CapProps {
    msgs: msgProps[],
    sendMsg: any,
}
const Capsule: React.FC<CapProps> = ({ msgs, sendMsg }) => {
    React.useEffect(() => {
        document.title = "Room";
    }, []);
    const Typer = useRef<HTMLInputElement>(null);


    return (
        <>
            <div className="w-full top-0 fixed flex border-b backdrop-blur-xl">
                <div className="w-full text-start p-4 flex">
                    <span className="font-bold w-full text-blue-600">ConnectSturd</span>
                </div>
                <div className="w-full"></div>
                <div className="w-full flex justify-end px-4 py-2 space-x-1">
                    <button type="button" className="px-4 py-2 bg-red-600 active:bg-red-800 text-white rounded-full text-sm max-h-[max-content] max-w-[max-content]" onClick={() => { }}>
                        Leave
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="h-[88vh] w-full pt-20 px-2 max-w-[1200px] overflow-y-auto">
                    {/* Msgs rendering part */}
                    {
                        msgs.map((element: any, index: any) => (
                            <div className="px-2 py-1 w-full" key={index}>
                                <span className="font-bold text-sm">{element.username}</span><br />
                                <span className='text-sm'>{element.msg}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="h-[12vh] w-full">
                <div className="w-full flex justify-center">
                    <div className="flex justify-center max-w-[700px] w-full px-2">
                        <input type="text" ref={Typer} className="px-4 py-2 w-full rounded-l-full border-t border-l border-b outline-none text-sm" placeholder="Type something..." onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                if (Typer && Typer.current) {
                                    console.log("Sending");

                                    sendMsg(localStorage.getItem('username'), Typer.current.value);
                                    Typer.current.value = "";
                                }
                            }
                        }} />
                        <button type="button" className="px-4 py-2 rounded-r-full text-sm border-r border-t border-b font-bold active:opacity-70" onClick={() => { }}>
                            Shout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Capsule;