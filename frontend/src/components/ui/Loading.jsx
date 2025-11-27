export default function Loading({color = "border-primary", screen}) {
    return (
        <div className={`flex justify-center items-center ${screen && "h-[80vh]"}`}>
        <div
            className={`w-8 h-8 border-4 ${color} border-t-transparent rounded-full animate-spin`}
        ></div>
        </div>
    );
}
