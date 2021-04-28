FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["FishFarm/FishFarm.csproj", "FishFarm/"]
RUN dotnet restore "FishFarm/FishFarm.csproj"
COPY . .
WORKDIR "/src/FishFarm"
RUN dotnet build "FishFarm.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FishFarm.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FishFarm.dll"]
