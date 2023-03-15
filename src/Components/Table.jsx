import { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "../utils/API";
import { useNavigate } from "react-router-dom";

export default function Table() {
  const headers = ["Name", "Contact", "E-Mail", "DOB"];

  const people = [
    {
      name: "Lindsay Walton",
      contact: "8072953226",
      email: "lindsay.walton@example.com",
      dob: "01-01-2021",
    },
  ];

  const navigate = useNavigate();

  //! Editing students details using PUT method
  const [delReferance, setDelReferance] = useState({});
  console.log(delReferance);
  const [referance, setReferance] = useState({});
  console.log(referance);
  const [users, getUsers] = useState([]);
  const [updateResponse, SetUpdateResponse] = useState({});
  const [formSignupSubmited, setFormSignupSubmited] = useState(false);
  const [signUpData, setSignUpData] = useState({});
  const [updateOrRegistration, setUpdateorRegistration] = useState(false);
  const [registrationResponse, setRegistrationResponse] = useState({});
  console.log(users);
  console.log(updateResponse);

  const handleChange = (e) => {
    setReferance({ ...referance, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch(`${Api}/editUsers/${referance._id}`, {
      method: "PUT",
      body: JSON.stringify(referance),
      headers: {
        "content-Type": "application/json",
      },
    }).then((res) => {
      SetUpdateResponse(res);
      navigate("/dashboard");
    });
  };

  const handleDelete = (_id) => {
    console.log(_id);
    fetch(`${Api}/deleteUsers/${_id}`, {
      method: "DELETE",
      body: JSON.stringify(referance),
      headers: {
        "content-Type": "application/json",
      },
    }).then((res) => {
      SetUpdateResponse(res);
      navigate("/dashboard");
    });
  };

  const getUserDatas = () => {
    const requestData = {
      method: "get",
      url: `${Api}/users`,
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    axios(requestData)
      .then(function (response) {
        getUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserDatas();
  }, [updateResponse, registrationResponse]);
  console.log(signUpData);

  // ? USER REGISTRATION BY ADMIN LYFECYCLE METHOD
  useEffect(() => {
    async function postData() {
      try {
        const response = await axios.post(
          `${Api}/createUser/byAdmin`,
          referance
        );
        setRegistrationResponse(response.data);
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
      }
    }

    if (formSignupSubmited) {
      postData();
      getUserDatas();
    }
  }, [signUpData, formSignupSubmited]);

  // ? REGISTRATION BY ADMIN HANDLER
  const handleRegistration = (e) => {
    e.preventDefault();

    setFormSignupSubmited(true);

    console.log(signUpData);
  };

  return (
    <div className="my-16">
      <div className="px-4 overflow-x-auto sm:px-6 lg:px-8">
        <div className="sm:flex px-24 sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Name
            </h1>
            <input
              className="border px-3 py-2 border-slate-300 rounded-md"
              type={"text"}
              name={"name"}
              onChange={handleChange}
              value={referance?.name || ""}
            />
          </div>

          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Contact
            </h1>
            <input
              className="border px-3 py-2 border-slate-300 rounded-md"
              type={"text"}
              name={"contact"}
              value={referance?.contact || ""}
              onChange={handleChange}
            />
          </div>

          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              E-Mail
            </h1>
            <input
              className="border px-3 py-2 border-slate-300 rounded-md"
              type={"email"}
              name={"email"}
              value={referance?.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              DOB
            </h1>
            <input
              className="border px-3 py-2 border-slate-300 rounded-md"
              type={"date"}
              name={"dob"}
              value={referance?.dob || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {updateOrRegistration ? (
              <button
                onClick={handleSubmit}
                type="button"
                className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update user
              </button>
            ) : (
              <button
                onClick={handleRegistration}
                type="button"
                className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create user
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle pl-12 sm:px-6 max-w-[950px] lg:px-52">
              <table className="w-[1200px] divide-y divide-gray-300">
                <thead>
                  <tr>
                    {headers.map((e, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        {e}
                      </th>
                    ))}

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[...users].map((person, key) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4  pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                        {person.contact}
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                        {person.dob}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => {
                            setReferance(person);
                            setUpdateorRegistration(true);
                          }}
                          key={key}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                      </td>

                      <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => {
                            handleDelete(person._id);
                          }}
                          key={key}
                          href="#"
                          className="text-indigo-600 text-red-600 hover:text-indigo-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
