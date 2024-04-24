import Image from "next/image";
import { usePage } from "../../common/exports";

const Settings = () => {
    const { setPage } = usePage();
    if (setPage === null) return null;
    return (
        <div className="flex h-[90vh] justify-center text-center items-center">
            {/* <div className="flex justify-center items-center m-2 bg-theme2 rounded-lg text-white h-1/4 w-2/5" onClick={() => setPage("addBoss")}>
                <Image className="absolute opacity-40" src="/vocabs/bossBG.png" alt="boss" width={150} height={150} />
                <span className="text-lg z-10">Add New Boss</span>
            </div> */}
            <div className="flex justify-center items-center m-2 bg-theme2 rounded-lg text-white h-1/4 w-2/5" onClick={() => setPage("addQuiz")}>
                <Image className="absolute opacity-40" src="/vocabs/Q.png" alt="boss" width={150} height={150} />
                <span className="text-lg z-10">Add Quiz Result</span>
            </div>
        </div>
    );
};
export default Settings;
