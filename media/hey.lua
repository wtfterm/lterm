local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local Camera = workspace.Camera
local Typing = false
_G.ESPVisible = true   -- If set to true then the ESP will be visible and vice versa.
_G.TextColor = Color3.fromRGB(255, 80, 10)   -- The color that the boxes would appear as.
_G.DisableKey = Enum.KeyCode.K   -- The key that disables / enables the ESP.
local getNil = function(name, class) for _, v in next, getnilinstances() do if v.ClassName == class and v.Name == name then return v end end end
local function CreateESP()
    for _, v in pairs(getNil("Game", "DataModel").Workspace.__THINGS.__INSTANCE_CONTAINER.Active.Backrooms:GetDescendants()) do
        if v.Name == "EggModel" then
            local ESP = Drawing.new("Text")
            RunService.RenderStepped:Connect(function()
                local Vector, OnScreen = Camera:WorldToViewportPoint(v.Position)
                if OnScreen == true then
                    ESP.Position = Vector2.new(Vector.X, Vector.Y + 5)
                    ESP.Text = v.Parent.Sign.SurfaceGui.TextLabel.Text
                    ESP.Visible = _G.ESPVisible
                else
                    ESP.Visible = false
                end
            end)
        end
    end
end

UserInputService.TextBoxFocused:Connect(function()
    Typing = true
end)

UserInputService.TextBoxFocusReleased:Connect(function()
    Typing = false
end)

UserInputService.InputBegan:Connect(function(Input)
    if Input.KeyCode == _G.DisableKey and Typing == false then
        _G.ESPVisible = not _G.ESPVisible
        
        game:GetService("StarterGui"):SetCore("SendNotification",{
            Title = "yup!";
            Text = "The ESP's visibility is now set to "..tostring(_G.ESPVisible)..".";
            Duration = 5;
        })
    end
end)

CreateESP()
