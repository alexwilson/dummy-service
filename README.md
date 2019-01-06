# Dummy Service

A simple, minimal express service for use in Fastly for testing and debugging, as a safe, known backend.
It will return all HTTP data sent to it.

There is a public instance running on `dummy.now.sh`.

---

*Warning*: This will reflect _everything_ that is sent to it, including potentially your authentication/authorization secrets.
Please take care not to leak anything sensitive.

---

With Dummy Service there are a couple of special-case headers which alter the behaviour of the service.

- `Dummy-Status`: This overrides the status-code returned by a given call. Defaults to 200. (e.g. return a 403)
- `Dummy-Response`: This overrides the response body returned by a given call. Otherwise will return all headers and cookies in a JSON blob. (e.g. return an error page)
- `Dummy-Delay`: This adds a delay (in microseconds) in the processing of the response, useful for testing a stalled origin. Defaults to off.
- `Dummy-Cache-Control`: This overrides the cache-control header returned. Defaults to `private` to prevent caching.