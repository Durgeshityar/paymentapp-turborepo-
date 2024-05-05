'use client'

export const InputBox = () => {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 ">
      <div>
        <p>Customer ID/ User ID :</p>
        <input
          type="text"
          className=" outline border rounded border-blue-500"
        ></input>
      </div>

      <div>
        <p>Enter M-PIN :</p>
        <input
          type="password"
          className=" outline border rounded border-blue-500"
        ></input>
        <p className="text-blue-800 text-sm underline pt-0.5 pl-2">
          forgot your credentials ?
        </p>
      </div>
      <div>
        <button
          className="bg-blue-500 rounded text-white w-full py-0.5"
          type="submit"
          onClick={() => {
            window.location.href = 'http://localhost:3000/transfer'
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
