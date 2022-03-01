<script>
    import "../app.css";
    import {firebaseConfig} from "../env";
    import {initializeApp} from "firebase/app"

    initializeApp(firebaseConfig)
</script>

<slot/>
