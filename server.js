/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var MEMBERS_FILE = path.join(__dirname, 'members.json');
var SETLIST_FILE = path.join(__dirname, 'setlist.json');


app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest members.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/members', function(req, res) {
  fs.readFile(MEMBERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/members', function(req, res) {
  fs.readFile(MEMBERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var members = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newMember = {
      id: Date.now(),
      name: req.body.name,
      description: req.body.description,
    };
    members.push(newMember);
    fs.writeFile(MEMBERS_FILE, JSON.stringify(members, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(members);
    });
  });
});

app.get('/api/setlist', function(req, res) {
  fs.readFile(SETLIST_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/setlist', function(req, res) {
  fs.readFile(SETLIST_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var setlist = JSON.parse(data);

    var newSong = {
      id: Date.now(),
      artist: req.body.artist,
      song: req.body.song,
      tags: req.body.tags,
    };
    setlist.push(newSong);
    fs.writeFile(SETLIST_FILE, JSON.stringify(setlist, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(setlist);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
