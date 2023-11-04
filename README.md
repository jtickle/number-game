# Number Game

Practice converting between numeric bases.

[Play Online Now!](https://jtickle.github.io/number-game)

It will give you a number in a base, and then ask you to convert it to
a different base.

Default settings will generate an 8-bit number and randomly select
conversions between Binary, Decimal, and Hexadecimal.

Octal is also named and supported, but not enabled by default. For more
extreme conversions, you can go to Settings, and add any radix between 2 
and 36 inclusive. These limit of 2 is due to mathematics and the limit
of 36 is due to the JavaScript parseInt function.

I will likely add support for positive bases at least up to base 64 at
some point. Beyond that point, the user interface would become
unwieldy.

This is an exploration into functional React, which is the only sensible
way to produce client-only Javascript.

As it happens, when I went to start this project, I remembered from the
last time I tried to make a React project and used Create React App.
Unfortunately, that one has already become deprecated and all official
replacements are tainted with proprietary cloudiness and seem to mandate
React on the Server? I don't get it. If you're doing React on the Server,
please stop, think about your life, and go use HTMX instead. There is
plenty of reason to NOT create SPA's and to involve the server in page
generation, but React is simply not the tool for that job. It is excellent
on the client. HTMX is what you want for this sort of thing on the server.

So anyway, I used [Vite](https://vitejs.dev/) which seems like a winner for
now. Please don't change the entire damn ecosystem once again before I
start my next React project sometime in a year or so. Thanks in advance.