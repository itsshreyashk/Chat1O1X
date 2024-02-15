import React from 'react';

interface HomeProps {
    status: string,
    usernameRef: React.RefObject<HTMLInputElement>;
    readyJoin: any;
}
const Home: React.FC<HomeProps> = ({ status, usernameRef, readyJoin }) => {
    React.useEffect(() => {
        document.title = "Home";
        return () => {
        }
    }, [])

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="p-5 flex items-center max-w-[700px] w-full bg-gray-100 rounded-lg shadow-md">
                    <input
                        type="text"
                        ref={usernameRef}
                        placeholder="Enter your username"
                        className="px-4 py-2 border rounded-l-full outline-none flex-grow bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors rounded-l-none"
                        onClick={() => {
                            if (usernameRef && usernameRef.current) {
                                localStorage.setItem("username", usernameRef.current.value);
                                alert("Updated username...");
                            }
                        }}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors rounded-r-lg"
                        onClick={readyJoin}
                    >
                        Join
                    </button>
                    <span className="ml-2 text-gray-600">{status}</span>
                </div>
            </div>
        </>
    )
}

export default Home;
