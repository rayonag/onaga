const Home = () => {
    return (
        <div className="flex flex-col justify-center text-center">
            <h2>Recent Vocab</h2>
            <input type="text" placeholder="Search" />
            <div className="flex justify-center">
                <div className="w-1/3">
                    <div className="border p-5 m-5">
                        <div className="text-2xl">Vocab</div>
                        <div>Meaning</div>
                        <div>Example</div>
                    </div>
                </div>
            </div>
            <input type="text" placeholder="Unit" />
            <input type="text" placeholder="Max HP" />
            <input type="text" placeholder="Reward" />
            <input type="text" placeholder="Boss" />
            <input type="text" placeholder="Due Date" />
        </div>
    );
};
export default Home;
