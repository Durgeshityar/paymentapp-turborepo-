'use client'

type Props = {
  placeholder: string
  onChange: (value: string) => void
  label: string
}

export const TextInput = ({ placeholder, onChange, label }: Props) => {
  return (
    <div>
      <label> {label}</label>
      <input
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      ></input>
    </div>
  )
}
