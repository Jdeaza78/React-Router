import { Outlet, NavLink, Link, useLoaderData, Form, useNavigation, useSubmit,} from "react-router-dom";
import { getContacts } from "../contacts";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";

    export async function loader({ request }) {
        const url = new URL(request.url);
        const q = url.searchParams.get("q");
        const contacts = await getContacts(q);
      
    return { contact, q };
  }

export async function loader() {
    const contacts = await getContacts();
    return { contacts };
  }

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    useEffect(() => {
        document.getElementById("q").value = q;
      }, [q]);
      const submit = useSubmit();
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                    submit(event.currentTarget.form);
                  }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                    <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {/* other code */}
                  </NavLink>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
            <ul>
              <li>
              <Link to={`contacts/1`}>Your Name</Link>
              </li>
              <li>
              <Link to={`contacts/2`}>Your Friend</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"> 
        className={
          navigation.state === "loading" ? "loading" : ""
        }
        <Outlet />
        </div>
      </>
    );
  }