# Zotero Group to bibtex

This web app gets all entries in Zotero groups and send them to the user using http. This also makes it possible to incorporate it `*.bib` file with a link through overleaf.

## Getting the web applikation ready

First you need to have node.js installed and it's package manager NPM.

You initialize the repository by writing:

```
ADD THINGS HERE
```

In oderder for the aplication to be able to use Zotero's wep API you need to map usernames to user IDs. (Only the user IDs needs to match the ones from Zotreo) If you want to be able to access privte groupe a Zotreo API Key is also needed. Please note that all exports will not be password protected and therefore people will be able to read the contents of private repositories through this web application if an API key is given. These informations is given in a json file by the name `users.json` placed in the root folder of this repository. The json file should have the following structure:

```json
{
  "users": [
    {
      "user": "user_name_1",
      "id": user_id,
      "key": "API-key (not requred)"
    },
    {
      "user": "user_name_2",
      "id": user_id
    }
  ]
}
```

Now the application is ready to be run.

You start the application by writing

```
$ npm start
```

## How to use it

Now you can get bibtex files by accessing the URL:

```
your_host.name/<user_name>/<zotero_group_name>.bib
```
