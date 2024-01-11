import {describe} from "vitest";
import {useRegisterModal} from "../../hooks/useRegisterModal";
import {renderHook} from '@testing-library/react'


describe("Test Login Modal component",()=>{
    it('Is useRegister hook initial state closed',()=>{
const {result}=renderHook(()=>useRegisterModal())
    })
})
