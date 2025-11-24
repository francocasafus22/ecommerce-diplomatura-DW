export default function InputForm({label, name, type, required, placeholder, value, onChange, colorRing="ring-celeste-500"}){
    return(
        <label className="flex flex-col gap-1">
                    <span className="text-md font-medium text-celes">{label}</span>
                    <input
                    name={name}
                    type={type || "text"}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`border border-gray-300 rounded-lg py-2 px-2 placeholder:text-placeholder focus:outline-none focus:ring-2 focus:${colorRing} shadow-xs`}/>
        </label>
    )
}