> This is a list of mistakes I did and thereby the extracted principles out of them (structured and polished by chatgpt)

# JWT Auth API Project – 23 Principles Learned

1. **JWTs don’t need to be stored server-side**  
   → The server verifies tokens, not remembers them.

2. **Design APIs for multiple users from the start**  
   → Don’t hardcode for single-user logic.

3. **Don’t persist JWTs in storage**  
   → They’re meant to be ephemeral and stateless.

4. **Always check for duplicates before registering users**  
   → Prevent redundant or conflicting data.

5. **Sync client token assignment before protected calls**  
   → Ensure token is set before using it.

6. **Spelling matters in headers**  
   → Typos like `Authoriztion` silently break systems.

7. **Split headers carefully**  
   → `split(" ")` is correct for `Bearer <token>`.

8. **Never call protected routes before login**  
   → Token must exist before access attempts.

9. **Importing middleware ≠ using it**  
   → Middleware must be passed in the route handler.

10. **Middleware is not a function to call manually**  
    → Express executes middleware, not you.

11. **Parameter order in middleware must be correct**  
    → `(req, res, next)` is non-negotiable.

12. **Headers are lowercase in Express**  
    → Always access `req.headers['authorization']`.

13. **Console logs must follow actual execution**  
    → Log after calls, not just declarations.

14. **Malformed tokens = extraction failure**  
    → Check token presence and format before verifying.

15. **Even hardcoded secrets won’t help with bad tokens**  
    → Fix token, not the secret.

16. **Don’t forget `next()` in middleware**  
    → Without it, requests never proceed.

17. **Use token only after it’s set**  
    → Async flow matters.

18. **Match client URLs with server routes exactly**  
    → No guesswork; one mismatch breaks the system.

19. **Protected requests must always send headers**  
    → JWT must be explicitly attached.

20. **Server logs ≠ client logs**  
    → Know where your console is printing.

21. **Request object must be passed by Express**  
    → Never invent `req`; let Express provide it.

22. **JWTs are meant to be verified, not stored**  
    → Trust the token, not state.

23. **Verify only after proper token extraction**  
    → Don’t pass garbage into `jwt.verify`.