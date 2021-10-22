/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import ProductsContext from "../../Context/ProductsContext/ProductsContext";

const CreateAndUpdateProduct = (props) => {
  const cancelButtonRef = useRef(null);

  const productsCtx = useContext(ProductsContext);

  const [categoriesMap, setCategoriesMap] = useState([]);

  const [files, setFiles] = useState([]);

  const [featured, setFeatured] = useState(true);

  const { categories, allCategories, createProduct, uploadImage } = productsCtx;

  const [inputFields, setInputFields] = useState([{ specificationName: "", specificationList: ["", ""] }]);

  const [newProduct, setNewProduct] = useState({
    specifications: [],
    categories: [],
  });

  useEffect(() => {
    if (!categories.length) allCategories();
    let newCategories = categories.map((category) => {
      return { label: category.label, value: category._id };
    });

    setCategoriesMap(newCategories);
  }, [categories]);

  const { open, setOpen, create } = props;

  const addNewField = () => {
    setInputFields([...inputFields, { specificationName: "", specificationList: [{ value: "" }, { value: "" }] }]);
  };

  const addNewFieldList = (i) => {
    const newData = [...inputFields];
    newData[i].specificationList.push({ value: "" });
    setInputFields(newData);
  };

  const handleForm = (event) => {
    event.preventDefault();

    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const entries = Object.entries(newProduct);
    let a = [];
    entries.forEach((item, i) => {
      let itemReturn = {
        specificationName: "",
        specificationList: [],
        index: 0,
      };
      if (item[0].includes("specificationName") || item[0].includes("specificationList")) {
        if (item[0].includes("specificationName")) {
          let idList = item[0].substr(item[0].length - 1);

          itemReturn.specificationName = item[1];
          itemReturn.index = idList;
          a.push(itemReturn);
        } else {
          let idList = item[0].substr(item[0].length - 1);
          a.forEach((f) => {
            if (f.index === idList) {
              f.specificationList.push(item[1]);
            }
          });
        }
      }
    });

    a.forEach((f) => {
      delete f.index;
    });

    // eslint-disable-next-line array-callback-return
    const newEntries = entries.filter((e) => {
      if (!e[0].includes("specification")) return e;
    });
    const finalEntries = newEntries.reduce((result, item) => {
      result[item[0]] = item[1];
      return result;
    }, {});

    if (create) {
      const image = [];

      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        const e = await uploadImage(element);
        image.push(e);
      }
      createProduct({ ...finalEntries, specifications: a, featured, image });
    }
    setNewProduct({
      specifications: [],
      categories: [],
    });
    setFiles([]);
    setInputFields([{ specificationName: "", specificationList: ["", ""] }]);
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="space-y-8 divide-y divide-gray-200"
              >
                <div className="space-y-8 divide-y divide-gray-200">
                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Informacion del producto</h3>
                      <p className="mt-1 text-sm text-gray-500">Verificar que todos los campos sean correctos</p>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Nombre del producto
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            onChange={(e) => {
                              handleForm(e);
                            }}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                          Stock
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            required
                            name="stock"
                            id="stock"
                            onChange={(e) => {
                              handleForm(e);
                            }}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Precio
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="price"
                            required
                            id="price"
                            onChange={(e) => {
                              handleForm(e);
                            }}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pl-2 pr-4 border-transparent bg-transparent text-gray-500 sm:text-sm">MXN</div>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Descripcion
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea
                            id="description"
                            name="description"
                            required
                            rows={3}
                            onChange={(e) => {
                              handleForm(e);
                            }}
                            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                          />
                          <p className="mt-2 text-sm text-gray-500">Escribe una breve descripcion del producto</p>
                        </div>
                      </div>
                      <div className="sm:col-span-6">
                        <label htmlFor="categories" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Categorias
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <Select
                            onChange={(e) => {
                              newProduct.categories = [];

                              e.forEach((category) => {
                                newProduct.categories.push(category.value);
                              });
                            }}
                            isSearchable={true}
                            options={categoriesMap}
                            isMulti
                            required
                            name="categories"
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:col-span-6 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Imagenes
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm justify-center text-gray-600">
                                <label
                                  htmlFor="image"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="image"
                                    name="image"
                                    onChange={(e) => {
                                      setFiles(e.target.files);
                                    }}
                                    multiple
                                    accept="image/*"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {inputFields.map((field, e) => {
                        return (
                          <>
                            <div className="sm:col-span-6">
                              <label htmlFor={`specificationName${e}`} className="block text-sm font-medium text-gray-700">
                                Nombre de la especificacion
                              </label>
                              <div className="mt-1">
                                <input
                                  onChange={(e) => {
                                    handleForm(e);
                                  }}
                                  required
                                  type="text"
                                  name={`specificationName${e}`}
                                  id={`specificationName${e}`}
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {field.specificationList.map((specification, i) => {
                              return (
                                <div className="sm:col-span-3" key={`specificationList${i}`}>
                                  <label htmlFor={`specificationList${i}${e}`} className="block text-sm font-medium text-gray-700">
                                    Especificaciones
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      required
                                      onChange={(e) => {
                                        handleForm(e);
                                      }}
                                      type="text"
                                      name={`specificationList${i}${e}`}
                                      id={`specificationList${i}${e}`}
                                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                            <div className="sm:col-start-3 sm:col-end-7 flex justify-end ">
                              <button
                                type="button"
                                onClick={() => addNewFieldList(e)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Nueva especificacion
                              </button>
                            </div>
                          </>
                        );
                      })}
                      <div className="sm:col-span-3 ">
                        <button
                          onClick={(e) => addNewField()}
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Nueva lista de especificaciones
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-0">
                    <div className="mt-6">
                      <fieldset>
                        <div className="mt-4 space-y-4">
                          <div className="relative flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                checked={featured}
                                onChange={(e) => setFeatured(!featured)}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="comments" className="font-medium text-gray-700">
                                Promocionado
                              </label>
                              <p className="text-gray-500">Producto que se muestra en la parte inferior de la pagina principal.</p>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateAndUpdateProduct;
