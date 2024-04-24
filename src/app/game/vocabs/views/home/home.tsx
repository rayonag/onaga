import { Haptics, ImpactStyle } from "@capacitor/haptics";

const Home = () => {
    const hapticsImpactMedium = async () => {
        await Haptics.impact({ style: ImpactStyle.Medium });
    };
    return (
        <div className="flex flex-col h-screen justify-center text-center items-center">
            <div onClick={async () => await hapticsImpactMedium} className="btn-theme">
                Coming Soon...
            </div>
        </div>
    );
};
export default Home;
